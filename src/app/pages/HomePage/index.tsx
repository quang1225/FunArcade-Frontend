import { Helmet } from 'react-helmet-async';
import { messages } from './messages';
import styled from 'styled-components';
import bannerHome from 'app/images/banner-home.jpg';
import banner1 from 'app/images/banners/home1.png';
import banner2 from 'app/images/banners/home2.png';
import bannerHomeMobile from 'app/images/banner-home-mobile.jpg';
// import CommonButton from 'app/components/common/CommonButton';
// import FacebookIcon from 'app/images/icons/facebook.png';
// import GoogleIcon from 'app/images/icons/google.png';
import GameGrid from 'app/components/GameGrid';
import Container from '@mui/material/Container';
import CustomBody from 'app/components/CustomBody';
import { useTranslation } from 'react-i18next';
import { GAME_LIST } from 'utils/gameConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { APP_TITLE, TRANSITION_TIME } from 'utils/constants';

const HomepageWrap = styled.div`
  .custom_body {
    .MuiContainer-root {
      justify-content: center;
    }
  }
`;

const BannerWrap = styled.div`
  background-size: cover;
  background-image: url(${bannerHome});
  position: relative;
  color: white;

  .MuiContainer-root {
    height: 320px;
    overflow: hidden;
  }

  .swiper {
    height: 100%;
    width: calc(100% + 700px);
    margin-left: unset;
    margin-right: unset;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        opacity: 0.3;
        transition: opacity ${TRANSITION_TIME}s;
      }

      &.swiper-slide-active {
        img {
          opacity: 1;
        }
      }
    }
  }

  .MuiContainer-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .first-text {
    font-weight: 600;
    font-size: 32px;
    margin-bottom: 12px;
    text-align: center;
  }

  .second-text {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 24px;
  }

  .action-btn {
    margin: 20px 0;
  }

  .login-social {
    span {
      font-size: 14px;
    }

    .logo {
      text-align: center;
      margin-top: 16px;

      img {
        cursor: pointer;

        &:first-child {
          margin-right: 25px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 32px 0;
    background-image: url(${bannerHomeMobile});

    .first-text {
      font-size: 24px;
    }

    .second-text {
      font-size: 20px;
    }
  }
`;

const GameListWrap = styled.div`
  .list {
    margin-bottom: 40px;

    .title {
      font-size: 20px;
      margin-left: 15px;
      margin-bottom: 18px;
      color: white;
      font-weight: 600;
    }
  }
`;

const homeBanners = [banner1, '', banner2];

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <HomepageWrap className="full_height_page">
      <Helmet>
        <title>{t(...messages.homepage())}</title>
        <meta name="description" content={String(t(...messages.homepage()))} />
      </Helmet>

      <BannerWrap>
        <Container>
          {/* <div className="first-text">{t(...messages.firstText())}</div>
          <div className="second-text">{t(...messages.secondText())}</div>
          <img src={MascotHome} alt="Mascot Home" width="140" height="140" /> */}

          {/* <CommonButton
            className="action-btn"
            width="160"
            text={t(...messages.signUp())}
          />
          <div className="login-social">
            <span>{t(...messages.socialLogin())}</span>
            <div className="logo">
              <img
                width="32"
                height="32"
                src={FacebookIcon}
                alt="Facebook Icon"
              />
              <img width="32" height="32" src={GoogleIcon} alt="Google Icon" />
            </div>
          </div> */}
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {homeBanners.map(src => (
              <SwiperSlide key={src}>
                <img src={src} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </BannerWrap>

      <CustomBody>
        <GameListWrap>
          <div className="list">
            <div className="title">{`${APP_TITLE} ${t(
              ...messages.multiplayerGames(),
            )}`}</div>
            <GameGrid gameList={GAME_LIST.filter(x => !x.isSingle)} />
          </div>

          <div className="list">
            <div className="title">{`${APP_TITLE} ${t(
              ...messages.singlePlayerGames(),
            )}`}</div>
            <GameGrid gameList={GAME_LIST.filter(x => x.isSingle)} />
          </div>
        </GameListWrap>
      </CustomBody>
    </HomepageWrap>
  );
};

export default HomePage;
