<template>
  <div class="footer-sec">
    <div class="back-to-top">
        <div id="app" v-cloak>
            <transition name="fade">
                <div id="pagetop" class="fixed right-0 bottom-0" v-show="scY > 300" @click="toTop">
                    <span class="top">
                        Back to top
                    </span>
                </div>
            </transition>
        </div>
    </div>

    <!-- <footer>
        <div class="container">
            <div class="copyright">
              <p class="text-center">©Copyright {{ currentYear }} B.L.S. Thathsara. All Rights Reserved</p>
            </div>
        </div>
    </footer> -->
  </div>
  </template>
  
  <script>
  
  export default {
    name: 'App',
    data() {
      return {
        email: '',
        currentYear: new Date().getFullYear(),
        scTimer: 0,
        scY: 0,
        contact: [
        {
          address: '471/B/07 Wakwella Road, Kalegana, Galle',
          phone: '+94 77 830 9497',
          email: 'letstalk@owirodigital.com'
        }
        ],
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll: function () {
        if (this.scTimer) return;
        this.scTimer = setTimeout(() => {
          this.scY = window.scrollY;
          clearTimeout(this.scTimer);
          this.scTimer = 0;
        }, 100);
      },
      toTop: function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      },
    },
  }
  </script>

<style lang="scss">
//Variables
$color-1: #1b1b1b;
$color-2: #7c7c7c;

$font-1 : 'Syne', sans-serif;
$font-2 : 'Heebo', sans-serif;

.back-to-top{
    

    #app{
        transform: rotate(-90deg);
        position: fixed;
        bottom: 220px;
        right: 30px;
        cursor: pointer;

        @media only screen and (max-width: 576px){
          right: -30px;
        }

        .top{
          font-size: 12px;
          letter-spacing: 2px;
          font-weight: 500;
          font-family: Archivo,sans-serif;
          text-transform: uppercase;

          &::after{
            content: '';
            position: absolute;
            top: 11px;
            right: calc(100% + 16px);
            width: 80px;
            height: 1px;
            background-color: #9f9f9f;
            transition: all .4s cubic-bezier(0,.68,.58,1),opacity .3s ease;
          }
        }
    }
}

footer{
    background-color: $color-1;
    padding-top: 30px;
    padding-bottom: 30px;

    .content{
      padding-bottom: 72px;
    }

    .copyright{
      padding-bottom: 20px;
      p{
        margin: 0;
        text-align: left;
        color: $color-2;

        a{
          text-decoration: none;
          color: $color-2;
          transition: all 0.3s;

          &:hover{
            color: #fff;
          }
        }
    }
    }

    .logo-wrap{
      .logo{
        width: 180px;
        padding-bottom: 30px;
      }
    }

    ul{
      padding-left: 0;
      padding-top: 25px;

      li{
        list-style: none;
        text-decoration: none;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: .1em;
        font-weight: 500;
        color: #fff;

        padding-bottom: 6px;

        &.info{
          text-decoration: none;
          font-family: $font-2;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .1em;
          font-weight: 500;
          color: #fff;
          a{
            text-decoration: none;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: .1em;
            font-weight: 500;
            color: #fff;
          }
        }

        a{
          text-decoration: none;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .1em;
          font-weight: 500;
          color: #fff;

          &:hover{
            color: #fff;
              opacity: .6;
            }
        }
      }
    }

    .newsletter{
      .title{
        font-weight: 600;
          color: #ffffff;
          font-size: 30px;
          line-height: 1.16em;
          font-family: $font-1;
      }

      .form-wrap{
        padding-top: 18px;
        input{
          background: 0 0;
          border-top: none;
          border-right: none;
          border-left: none;
          padding-left: 0;
          border-color: #315361;
          color: #6e6e6e;
          border-bottom: 1px solid #315361!important;
          border-image-source: none;
          border-image-slice: 0;
          width: 100%;
          padding: 10px 20px 10px 0;

          &:focus{
            outline: none;
          }
        }
        button{
          font-family: $font-2;
          letter-spacing: 4px;
          font-size: 12px;
          line-height: 1.33em;
          color: #fff;
          font-weight: 500;
          text-transform: uppercase;
          background: none;
          border: none;
          display: block;
          padding-top: 22px;
          padding-left: 95px;
          position: relative;

          &::after{
            content: '';
            position: absolute;
            top: 75%;
            left: 0;
            width: 80px;
            height: 1px;
            background-color: #ffffff;
            transition: width .4s cubic-bezier(0,.68,.58,1);
          }
        }
      }
    }
}
</style>
  