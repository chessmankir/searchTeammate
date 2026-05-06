export const typeDefs = `#graphql
     type BlockStatus {
        iBlockedHim: Boolean!
        heBlockedMe: Boolean!
        isBlockedHim: Boolean!
     }
        
     type BlockPayload {
        ok: Boolean!
        blocked: Boolean!
     }
     
     type Query{
        blockStatus(userId: Int!): BlockStatus
     }
     
     type Mutation{
        blockUser(userId: Int!): BlockPayload!
        unblockUser(userId: Int!): BlockPayload!
     }
`;