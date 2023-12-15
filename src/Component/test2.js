import React from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import '../css/test2.css';

const MultipleItemsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div>
      <h2>Multiple Items</h2>
      <Slider {...settings}>
        <div>
            <img 
            src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/438/highlight/MAEr7uJ3vUafz2OnzGfFIw.jpg"/
            >
            <div class="text">BÁNH BAO</div>
            <h3 class='nice'>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>


      </Slider>

    </div>
  );
};

export default MultipleItemsSlider;
