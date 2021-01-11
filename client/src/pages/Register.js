import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

function Register({ history }) {
  const context = useContext(AuthContext);
  const [error, setError] = useState({});

  const { onChange, onSubmit, value } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: value,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={value.username}
          error={error.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Email"
          placeholder="example@gmail.com"
          type="email"
          name="email"
          value={value.email}
          error={error.email ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          value={value.password}
          error={error.password ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Confirm password"
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          value={value.confirmPassword}
          error={error.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(error).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(error).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
