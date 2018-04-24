import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import PDVLoaders from '../dataloaders/PDV';
import PDVModel from '../models/PDV';

const typeDefs = [`
type pdv {
    id: Int!
    tradingName: String!
    ownerName: String!
    document: String!
    coverageArea: CoverageArea!
    address: Address!
}

type CoverageArea {
    type: String!
    coordinates: [[[[Float]]]]!
}

type Address {
    type: String!
    coordinates: [Float]!
}

type PDVMutation {
  create(
    tradingName: String!
    ownerName: String!
    document: String!
    coverageArea: CoverageAreaInput!
    address: AddressInput!
  ): pdv
}

type Query {
    pdvs(filter: PDVFilter): [pdv]
}

input PDVFilter {
    id: Int
}

input CoverageAreaInput {
    type: String!
    coordinates: [[[[Float]]]]!
}

input AddressInput {
    type: String!
    coordinates: [Float]!
}

schema {
    query: Query
    mutation: PDVMutation
}
`];

const resolvers = {
  Query: {
    pdvs: (_, {}) => PDVLoaders.pdvs.load(keys),
  },
  PDVMutation: {
    create: (_, CreatePDVInput) => {
      return new PDVModel({
        _id: mongoose.Types.ObjectId(),
        tradingName: CreatePDVInput.input.tradingName,
        ownerName: CreatePDVInput.input.ownerName,
        document: CreatePDVInput.input.document,
        coverageArea: CreatePDVInput.input.coverageArea,
        address: CreatePDVInput.input.coverageArea,
      })
        .save()
        .then(pdv => pdv)
        .then(null, err => err);
    },
  },
};

const PDVSchema = makeExecutableSchema({ typeDefs, resolvers });

export default PDVSchema;
