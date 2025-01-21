import styled from "styled-components";

const BannerContainer = styled.section`
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
`

const BannerContent = styled.div`
  border-radius: 10px;
  img{
    width:100%; 
    height: 50%;
  }
`
const BannerCard = styled.div`
background-color: transparent;
display: flex;
justify-content: center;


 img{
    width: 80%;
    height: 30%;
    position: absolute;
    top: 450px;
 }


`

const Banner = () => {
  return (
    <BannerContainer> 
      <BannerContent>
        <img src="img/banner.png" alt="Imagen Banner"/>
      <BannerCard>
        <img src="img/card.png" alt="Imagen Card"/>
      </BannerCard>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;