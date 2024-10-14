import { type SchemaTypeDefinition } from 'sanity'
import postSchema from './post'
import userSchema from './user'
import commentSchema from './comment'
import postedBySchema from './postedBy'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    postSchema,
    userSchema,
    commentSchema,
    postedBySchema
  ],
}
