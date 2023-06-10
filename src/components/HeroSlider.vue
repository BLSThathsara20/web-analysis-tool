<template>
  <section class="main-slider">
    <div class="container">
      <div class="carousel">
        <div class="carousel__track" :style="trackStyles">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="carousel__slide"
            :class="{ active: index === currentSlide }"
          >
            <div class="row">
              <div class="col-12 col-md-6 col-lg-6 hero-content order-1 order-md-0">
                <div class="carousel__slide-content">
                  <div class="wrapper">
                    <h2 class="sub-title">{{ slide.subTitle }}</h2>
                    <h1 class="main-title">{{ slide.mainTitle }}</h1>
                  </div>
                  <div class="action">
                    <a class="apply-ct" href="#">Apply Now</a>
                    <a class="view-more" href="#">View More</a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-6 order-0 order-md-1">
                <div class="carousel__slide-image">
                  <img class="img-fluid ratio ratio-4x3" :src="slide.image" :alt="slide.title" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="carousel__controls">
        <button
          class="carousel__button carousel__button--prev"
          @click="prevSlide"
        >
          Prev
        </button>
        <div class="middle-line"></div>
        <button
          class="carousel__button carousel__button--next"
          @click="nextSlide"
        >
          Next
        </button>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          subTitle: "Slide 1",
          mainTitle: "This is slide 1",
          image: "https://deon.qodeinteractive.com/wp-content/uploads/2021/11/Rev-slider-img-2.png",
        },
        {
          subTitle: "Slide 2",
          mainTitle: "This is slide 2",
          image: "https://deon.qodeinteractive.com/wp-content/uploads/2021/12/Rev-slider-img-3.png",
        },
        {
          subTitle: "Slide 3",
          mainTitle: "This is slide 3",
          image: "https://deon.qodeinteractive.com/wp-content/uploads/2021/11/Rev-slider-img-2.png",
        },
      ],
      autoplayInterval: null,
    };
  },
  computed: {
    trackStyles() {
      return {
        transform: `translateX(-${this.currentSlide * 100}%)`,
      };
    },
  },
  methods: {
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(this.nextSlide, 5400);
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    },
  },
  mounted() {
    this.startAutoplay();
  },
  beforeDestroy() {
    this.stopAutoplay();
  },
};
</script>

<style lang="scss">
//Variables
$font-1: "Syne", sans-serif;
$font-2: "Heebo", sans-serif;

.carousel {
  position: relative;
  height: 95vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 768px){
    height: 90vh;
        }
        @media only screen and (max-width: 576px){
          height: 70vh;
        }

  &__track {
    display: flex;
    transition: transform 0.5s ease;
  }

  &__slide {
    flex-shrink: 0;
    width: 100%;
    box-sizing: border-box;
    transition: transform 0.5s ease, opacity 0.5s ease;
    transform: translate(0, 100%);
    opacity: 0;

    display: flex;
    justify-content: flex-end;

    .hero-content{
      display: flex;
      align-items: center;
    }

    &.active {
      transform: translate(0, 0);
      opacity: 1;
    }

    .carousel__slide-content {

      .wrapper {
        .sub-title {
          font-family: $font-1;
          text-transform: uppercase;
          color: #979797;
          line-height: 16px;
          letter-spacing: 3px;
          font-weight: 500;
          font-size: 12px;
        }
        .main-title {
          font-family: $font-1;
          color: #000000;
          width: 634px;
          line-height: 70px;
          letter-spacing: 0px;
          font-weight: 600;
          font-size: 60px;

          @media only screen and (max-width: 92px){
            font-size: 42px;
            line-height: 40px;
          }
          @media only screen and (max-width: 786px){
            font-size: 36px;
            line-height: 40px;
            display: table-header-group;
          }
          @media only screen and (max-width: 576px){
            font-size: 28px;
            line-height: 30px;
          }
        }
      }
      .action{
        display: flex;
        gap: 12px;

        padding-top: 40px;

        a{
          font-family: $font-2;
          font-size: 12px;
          line-height: 1.33em;
          letter-spacing: .2em;
          font-weight: 500;

          &.apply-ct{
            color: #ffffff;
            background: linear-gradient(45deg,#5cc3ee 0,#5d91ef 29%,#5e5ef0 50%,#947be1 73%,#ca97d2 100%);
            text-decoration: none;
            padding: 10px 40px;
            border: 1px solid;
            border-image-source: linear-gradient(70deg,#57b8e0,#5762e2,#be8ec6);
            border-image-slice: 1;
            transition: all 0.3s;

            &:hover{
              color: #000;
              background: none;
            }
          }

          &.view-more{
            text-decoration: none;
            padding: 10px 40px;
            color: #000;
            border: 1px solid;
            border-image-slice: 1;
            border-image-source: linear-gradient(70deg,#57b8e0,#5762e2,#be8ec6);
            background: none;
            transition: all 0.3s;

            &:hover{
              color: #fff;
              background: linear-gradient(45deg,#5cc3ee 0,#5d91ef 29%,#5e5ef0 50%,#947be1 73%,#ca97d2 100%);
            }
          }
        }
      }
    }

    .carousel__slide-image{
      @media only screen and (max-width: 768px){
          display: flex;
          justify-content: center;
          padding-bottom: 40px;
        }
      img{
        width: 80%;

        @media only screen and (max-width: 786px){
          width: 80%;
          text-align: center;
        }
        @media only screen and (max-width: 576px){
          width: 50%;
        }
      }
    }
  }

  .carousel__controls{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    padding-top: 40px;

    .carousel__button {

      background: none;
    cursor: pointer;
    font-size: 12px;
    letter-spacing: 2px;
    line-height: 16px;
    font-weight: 600;
    font-family: $font-2;
    transition: all 0.3s ease-in-out;
    border: none;
    
  }
  .middle-line{
    background-color: #000;
    width: 100px;
    height: 1px;
    margin-right: 10px;
    margin-left: 10px;

  }
  }
}
</style>

