import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args: { paginationOpts: paginationOptsValidator , search : v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    if(args.search) {
      return await ctx.db.query("documents").withSearchIndex("search_title",(q)=> q.search("title",args.search?args.search:"undefined").eq("ownerId",user.subject)).paginate(args.paginationOpts)
    }
    return await ctx.db.query("documents").withIndex("by_owner_id", (q)=> q.eq("ownerId",user.subject)).order("asc").paginate(args.paginationOpts);
  },
});

export const create = mutation({
  args: { title : v.optional(v.string()) , initialContent : v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    //so create function does what is that it returns you with document id and you just have to fetch it on front -end
    const documentId =  await ctx.db.insert("documents",{
      title : args.title ?? "Untitled Document",
      ownerId : user.subject,
      initialContent : args.initialContent,
    });
    return documentId;
  },
});

export const deleteDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if(!user){
      throw new ConvexError("Unauthorized");
    }
    await ctx.db.delete(args.id);
  },
});