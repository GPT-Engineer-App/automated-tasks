import { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";

const API_BASE_URL = "https://backengine-66nh.fly.dev";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.status === 204) {
        toast({
          title: "Customer Added",
          description: "The customer has been successfully added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setName("");
        setEmail("");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Add Customer
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Add Customer
        </Button>
      </form>
    </Box>
  );
};

export default AddCustomer;
