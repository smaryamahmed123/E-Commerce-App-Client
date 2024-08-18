import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../Components/Navbar';

const faqData = [
  {
    question: "What is your return policy?",
    answer: "You can return any product within 30 days of purchase as long as it is in its original condition. Please refer to our returns page for more details."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to most countries. Shipping rates and delivery times vary based on the destination."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive a tracking number via email. You can use this number to track your order on our website."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and other secure payment methods. You can select your preferred payment method at checkout."
  },
  {
    question: "How can I contact customer service?",
    answer: "You can reach our customer service team by email at support@example.com or by phone at (123) 456-7890. We are available from 9 AM to 6 PM EST, Monday through Friday."
  },
  {
    question: "Can I change or cancel my order after placing it?",
    answer: "If you need to make changes to your order, please contact us as soon as possible. Once an order is processed, changes or cancellations may not be possible."
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes, we offer gift cards in various denominations. You can purchase them on our website and they can be used towards any purchase."
  }
];

const FAQ = () => {
  return (
    <Container>
      <Navbar />
      <Box my={4} sx={{ marginTop: '100px' }}>
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;
