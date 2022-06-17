import ReactDOM from "react-dom";
import { ListOfProjects } from "../ListOfProjects";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});

it("renders without crashing", () => {
const div = document.createElement("div");
ReactDOM.render(
    <ApolloProvider client={client}>
        <ListOfProjects />
    </ApolloProvider>,
    div
);
});
