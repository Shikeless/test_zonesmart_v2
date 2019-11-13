import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { load } from "../../localStorage";
import { authRequest, verRequest } from "../../modules/Auth/actions";
import { getIsAuthorized, getAuthError } from "../../modules/Auth/auth";
import styles from "./Login.module.css";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const MapStateToProps = state => ({
    isAuthorized: getIsAuthorized(state),
    error: getAuthError(state)
});

const MapDispatchToProps = { authRequest, verRequest };

const fields = [
    {
        id: "email",
        label: "Почта",
        type: "text"
    },
    {
        id: "password",
        label: "Пароль",
        type: "password"
    }
];

class Login extends PureComponent {
    state = {
        values: {
            email: "",
            password: ""
        }
    };

    componentDidMount() {
        if (load("access") !== null) this.props.verRequest();
    }

    handleChange = event => {
        const { values } = this.state;
        this.setState({
            values: { ...values, [event.target.name]: event.target.value }
        });
    };

    handleSubmit = () => {
        const {
            values: { email, password }
        } = this.state;
        this.props.authRequest({ email, password });
    };

    render() {
        const { isAuthorized, error } = this.props;
        const { values } = this.state;
        if (isAuthorized) return <Redirect to="/products" />;
        return (
            <div className={styles.root}>
                {error !== null && <Alert color="danger">{error}</Alert>}
                <Form>
                    {fields.map(({ id, label, type }) => (
                        <React.Fragment key={id}>
                            <FormGroup>
                                <Label for={id}>{label}</Label>
                                <Input
                                    id={id}
                                    type={type}
                                    name={id}
                                    value={values[id]}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </React.Fragment>
                    ))}
                    <Button
                        onClick={this.handleSubmit}
                        className={styles.formElement}
                    >
                        Войти
                    </Button>
                </Form>
                <div></div>
            </div>
        );
    }
}

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(Login);
