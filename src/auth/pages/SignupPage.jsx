import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import signup from "../../assets/signup.jpg";
import { useAuthStore, useForm } from "../../hooks";
import styles from "./Auth.module.css";

const signupFormFields = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const formValidations = {
  name: [(value) => value.length >= 3, "Debe ingresar un nombre valido"],
  email: [(value) => value.includes("@"), "El correo debe ser valido"],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe de tener más de 6 letras",
  ]
};

export const SignupPage = () => {
  const { startRegister, errorMessage, status } = useAuthStore();

  const [alertMessage, setAlertMessage] = useState("");

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const {
    name,
    email,
    password,
    confirmPassword,
    onInputChange,
    isFormValid,
    nameValid,
    emailValid,
    passwordValid,
    confirmPasswordValid,
  } = useForm(signupFormFields, formValidations);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (errorMessage !== undefined) {
      setAlertMessage(errorMessage);
    }
  }, [errorMessage]);

  const onSubmit = (event) => {
    event.preventDefault();
    setValidated(true);

    if (!isFormValid) return;
    
    if (password !== confirmPassword) {
      setAlertMessage("Las contraseñas no coinciden");
      return;
    }

    startRegister({ name, email, password });

    if (errorMessage !== undefined) {
      setAlertMessage(errorMessage);
      return;
    }
  };

  return (
    <Container className={`${styles.authForm} py-5 h-100  animate__animated animate__fadeIn animate__faster`} fluid >
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col xl={8}>
          <Card style={{ borderRadius: "1rem" }}>
            <Row className="g-0">
              <Col md={6} lg={5} className="d-none d-md-block">
                <img
                  src={signup}
                  alt="signup form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                />
              </Col>
              <Col md={6} lg={7} className="d-flex align-items-center">
                <Card.Body className="p-4 p-lg-5 text-black">
                  <Form onSubmit={onSubmit} noValidate validated={validated}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <span className="h1 fw-bold mb-0">
                        {" "}
                        <i className="fa-regular fa-calendar"></i>
                      </span>
                    </div>

                    <h5
                      className="fw-normal mb-3 pb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Crear una Cuenta
                    </h5>
                    {alertMessage && (
                      <Alert variant="danger">{alertMessage}</Alert>
                    )}
                    <Form.Group className="mb-4" controlId="name">
                      <FloatingLabel label="Nombre" controlId="name">
                        <Form.Control
                          type="text"
                          placeholder="Nombre"
                          name="name"
                          value={name}
                          onChange={onInputChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {nameValid}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="name">
                      <FloatingLabel label="Correo" controlId="email">
                        <Form.Control
                          type="email"
                          placeholder="Correo"
                          name="email"
                          value={email}
                          onChange={onInputChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {emailValid}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="password">
                      <FloatingLabel label="Contraseña" controlId="password">
                        <Form.Control
                          type="password"
                          placeholder="Contraseña"
                          name="password"
                          value={password}
                          onChange={onInputChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {passwordValid}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="confirmPassword">
                      <FloatingLabel
                        controlId="confirmPassword"
                        label="Confirmar Contraseña"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Repita la contraseña"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={onInputChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {confirmPasswordValid}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <div className="pt-1 mb-4">
                      <Button
                        variant="dark"
                        size="lg"
                        type="submit"
                        disabled={isAuthenticating}
                      >
                        {isAuthenticating ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Registrarse"
                        )}
                      </Button>
                    </div>

                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      ¿Ya tienes una cuenta?{" "}
                      <a href="/auth/login" style={{ color: "#393f81" }}>
                        Inicia sesión
                      </a>
                    </p>
                  </Form>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
