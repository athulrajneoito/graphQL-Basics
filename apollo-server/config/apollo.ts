import {
    ValidationError,
    UserInputError,
    AuthenticationError,
    ForbiddenError,
    SchemaDirectiveVisitor,
} from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from '~graphql/schemas';
import resolvers from '~graphql/resolvers';

const federatedSchema = buildFederatedSchema([{ typeDefs, resolvers }]);
SchemaDirectiveVisitor.visitSchemaDirectives(federatedSchema, schemaDirectives);

export default {
    schema: federatedSchema,
    playground: {
        settings: {
            'editor.theme': 'light',
        },
    },

};
