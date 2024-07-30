import { useState } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { loginUser, registerUser } from "../services/auth-service";

function AuthPage() {
  const [username, setUsername] = useState("login");
  const [password, setPassword] = useState("password");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginUser({ username, password });
    setPassword("");
    setUsername("");
    if (response.id) {
      sessionStorage.setItem("token", response.token);
      console.log(sessionStorage.getItem("token"));
      location.reload();
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await registerUser({ username, password });
    setPassword("");
    setUsername("");
    if (response.userId) {
      setIsRegisterModalOpen(false);
      return;
    } else {
      setIsRegisterModalOpen(true);
      throw new Error("Ошибка регистрации");
    }
  };

  const toggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="p-3 d-flex flex-column gap-3">
        <h1>Welcome!</h1>
        <div>
          <form onSubmit={(e) => handleLogin(e)}>
            <FormGroup>
              <Label for="examplePassword">Login</Label>
              <Input
                placeholder="your login"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                placeholder="your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button
              type="submit"
              color="primary"
              outline
              className="w-100"
              // onClick={handleLogin}
            >
              Sign-In
            </Button>
          </form>
        </div>
        <a href="#" className="text-center" onClick={toggleRegisterModal}>
          Sign-Up
        </a>

        <Modal isOpen={isRegisterModalOpen} toggle={toggleRegisterModal}>
          <form onSubmit={handleRegister}>
            <ModalHeader>Sign-Up</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="registerUsername">Login:</Label>
                <Input
                  type="text"
                  placeholder="Enter username"
                  id="registerUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="registerPassword">Password:</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  id="registerPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleRegisterModal}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Sign-Up
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default AuthPage;
