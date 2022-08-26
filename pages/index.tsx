import type { NextPage } from "next";
import { Accordion, Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const Home: NextPage = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [fetchKey, setFetchKey] = useState("");
  const [retrievedValue, setRetrievedValue] = useState("");
  const [deleteKey, setDeleteKey] = useState("");

  const createKvp = async () => {
    try {
      await axios.post("http://localhost:8000/set-kcm", {
        key,
        value,
      });
      alert(`Key ${key} and value ${value} created successfully`);
    } catch (error) {
      alert("Failed to create key value pair");
    }
    setKey("");
    setValue("");
  };

  const fetchValue = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/get-kcm/${fetchKey}`
      );
      setRetrievedValue(response.data);
    } catch (_error) {
      alert("Key not found");
      setFetchKey("");
      setRetrievedValue("");
    }
  };
  const deleteKvp = async () => {
    try {
      await axios.delete(`http://localhost:8000/delete-kcm/${deleteKey}`);
      alert(`Key ${fetchKey} deleted successfully`);
      setDeleteKey("");
    } catch (_error) {
      alert("Failed to delete Key value pair");
    }
  };
  const handleCreateKVP = (e: any) => {
    e.preventDefault();
    createKvp();
  };
  const handleRetrieveValue = (e: any) => {
    e.preventDefault();
    fetchValue();
  };
  const handleDeleteKvp = (e: any) => {
    e.preventDefault();
    deleteKvp();
  };
  return (
    <div>
      <h1 className="text-center">Cactus API - Keychain Memory</h1>
      <Container>
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Create Key Value Pair</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleCreateKVP}>
                <Form.Group controlId="formKey">
                  <Form.Label>Key</Form.Label>
                  <Form.Control
                    type="type"
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                    placeholder="Enter a key"
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a value"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Get Key Value Pair</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleRetrieveValue}>
                <Form.Control
                  type="text"
                  placeholder="Enter a key"
                  onChange={(e) => setFetchKey(e.target.value)}
                  value={fetchKey}
                ></Form.Control>
                <Button type="submit">Submit</Button>
              </Form>
              <div>
                value:
                <p>{retrievedValue}</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Delete Key Value Pair</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleDeleteKvp}>
                <Form.Control
                  type="text"
                  placeholder="Enter a key"
                  onChange={(e) => setDeleteKey(e.target.value)}
                  value={deleteKey}
                ></Form.Control>
                <Button type="submit">Submit</Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
};

export default Home;
