import { defaultFieldResolver, GraphQLField } from "graphql";
import { ApolloError, SchemaDirectiveVisitor } from "apollo-server";


export class IsAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>) {
        const {
            resolve = defaultFieldResolver
        } = field;
        field.resolve = async function (...args: any) {
            let [_, { }, {
                isAuth
            }] = args;

            if (isAuth) {
                const result = await resolve.apply(this, args);
                return result
            } else {
                throw new ApolloError('User not Authenticated')
            }
        }
    }
}