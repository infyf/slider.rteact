import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SliderContainer = styled.div`
  width: 100vw;
  height: 90vh;
  overflow: hidden;
  position: relative;
`;

const Slide = styled.div`
  width: 100vw;
  height: 90vh;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: ${props => props.active ? '0' : '100%'};
  transition: left 0.5s ease-in-out;
`;

const TextContainer = styled.div`
  text-align: center;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: black;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  font-style: italic;
  color: #d1d5db;
  margin-bottom: 1rem;
`;

const StyledButton = styled.button`
  font-weight: bold;
  background-color: #a3e635;
  padding: 0.5rem 2rem;
  font-size: 1.125rem;
  color: black;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
    background-color: #064e3b;
    color: white;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  ${props => props.left ? 'left: 10px;' : 'right: 10px;'}
`;

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('./img/Hero_Slider/Slider.json')
      .then(response => response.json())
      .then(data => setSlides(data.heroSlider))
      .catch(error => console.log("Error:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2400); 

    return () => clearInterval(interval); // Очищення інтервалу при розмонтуванні
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <SliderContainer>
      {slides.map((slide, index) => (
        <Slide key={slide.id} bgImage={slide.image} active={index === currentSlide}>
          <TextContainer>
            <Title>{slide.title}</Title>
            <Subtitle>{slide.subtitle}</Subtitle>
            <Link to={slide.link}>
              <StyledButton>{slide.buttonText}</StyledButton>
            </Link>
          </TextContainer>
        </Slide>
      ))}
      <NavButton left onClick={prevSlide}>&#10094;</NavButton>
      <NavButton onClick={nextSlide}>&#10095;</NavButton>
    </SliderContainer>
  );
};

export default Slider;
