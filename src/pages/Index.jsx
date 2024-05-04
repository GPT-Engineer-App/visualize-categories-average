import React, { useState } from "react";
import { Container, VStack, Heading, Input, Button, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, NumberInput, NumberInputField, Text, Box } from "@chakra-ui/react";
import { FaPlus, FaCalculator } from "react-icons/fa";

const Index = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [category, setCategory] = useState("");
  const [averages, setAverages] = useState({});

  const handleAddItem = () => {
    if (itemName && itemValue && category) {
      const newItem = { name: itemName, value: parseFloat(itemValue), category };
      setItems([...items, newItem]);
      setItemName("");
      setItemValue("");
      setCategory("");
    }
  };

  const calculateAverages = () => {
    const sums = {};
    const counts = {};

    items.forEach((item) => {
      if (sums[item.category]) {
        sums[item.category] += item.value;
        counts[item.category] += 1;
      } else {
        sums[item.category] = item.value;
        counts[item.category] = 1;
      }
    });

    const newAverages = {};
    Object.keys(sums).forEach((category) => {
      newAverages[category] = sums[category] / counts[category];
    });

    setAverages(newAverages);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl">
          Dataset Categorizer
        </Heading>
        <FormControl>
          <FormLabel>Item Name</FormLabel>
          <Input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Enter item name" />
        </FormControl>
        <FormControl>
          <FormLabel>Item Value</FormLabel>
          <NumberInput precision={2} min={0}>
            <NumberInputField value={itemValue} onChange={(e) => setItemValue(e.target.value)} placeholder="Enter item value" />
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddItem}>
          Add Item
        </Button>
        <Button leftIcon={<FaCalculator />} colorScheme="green" onClick={calculateAverages}>
          Calculate Averages
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Value</Th>
              <Th>Category</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td isNumeric>{item.value.toFixed(2)}</Td>
                <Td>{item.category}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box mt={4}>
          <Heading as="h2" size="lg">
            Averages by Category
          </Heading>
          {Object.keys(averages).map((category, index) => (
            <Text key={index}>
              {category}: {averages[category].toFixed(2)}
            </Text>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
