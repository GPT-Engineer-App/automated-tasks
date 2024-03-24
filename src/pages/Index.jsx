import { useState } from "react";
import { Box, Heading, Text, Button, Input, FormControl, FormLabel, VStack, useToast } from "@chakra-ui/react";
import { FaLock, FaUserPlus } from "react-icons/fa";

const API_BASE_URL = "https://backengine-66nh.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
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

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Signup Successful",
          description: "You can now log in with your credentials",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Signup Failed",
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Welcome to the Interactive Website
      </Heading>
      {isLoggedIn ? (
        <Box>
          <Text fontSize="xl">You are logged in!</Text>
          <Button colorScheme="red" onClick={handleLogout} mt={4}>
            Logout
          </Button>
        </Box>
      ) : (
        <VStack spacing={4} align="stretch">
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaLock />} colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
          <Text>
            Don't have an account?{" "}
            <Button leftIcon={<FaUserPlus />} variant="link" onClick={handleSignup}>
              Sign up
            </Button>
          </Text>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
