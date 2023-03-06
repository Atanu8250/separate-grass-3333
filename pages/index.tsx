import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import Slider from "react-slick";
import { useEffect } from "react";
import { State } from "../redux/store";
import NewsCard from "@/components/newsCard";
import { IoTvOutline } from "react-icons/io5";
import LeftSidebar from "@/components/LeftSidebar";
import { getNews } from "@/redux/news/news.actions";
import RightSidebar from "@/components/RightSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getLaptop, getMobile, getTv } from "@/redux/products/products.actions";
import { CgSmartHomeRefrigerator, CgGames } from "react-icons/cg";
import { AiOutlineMobile, AiOutlineTablet } from "react-icons/ai";
import { GiConsoleController, GiWashingMachine } from "react-icons/gi";
import {
  Flex,
  Show,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  BsLaptop,
  BsSmartwatch,
  BsSpeaker,
  BsHeadphones,
  BsCamera,
} from "react-icons/bs";
import {
  getLaptopAPI,
  getMobileAPI,
  getTvAPI,
} from "@/redux/products/products.api";
import { getNewsAPI } from "@/redux/news/news.api";

export default function Home({ mobiles, news, tv, laptops }: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    getMobile(dispatch, mobiles);
    getTv(dispatch, tv);
    getNews(dispatch, 15);
    getLaptop(dispatch, laptops);
  }, []);
  const gridProducts = useBreakpointValue<any>({
    base: 3,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  });
  const newsProducts = useBreakpointValue<any>({
    base: 3,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 5,
  });
  const sliderItems = useBreakpointValue<any>({
    base: 5,
    sm: 6,
    md: 6,
    lg: 7,
    xl: 8,
  });
  const productFinderArr = [
    {
      name: "Mobiles",
      icon: AiOutlineMobile,
    },
    {
      name: "Laptops",
      icon: BsLaptop,
    },
    {
      name: "TV",
      icon: IoTvOutline,
    },
    {
      name: "Tablets",
      icon: AiOutlineTablet,
    },
    {
      name: "Smart Watches",
      icon: BsSmartwatch,
    },
    {
      name: "Headphones",
      icon: BsHeadphones,
    },
    {
      name: "Cameras",
      icon: BsCamera,
    },
    {
      name: "Gaming Consoles",
      icon: GiConsoleController,
    },
    {
      name: "Speakers",
      icon: BsSpeaker,
    },
    {
      name: "Refrigerator",
      icon: CgSmartHomeRefrigerator,
    },
    {
      name: "Washing Machine",
      icon: GiWashingMachine,
    },
    {
      name: "Games",
      icon: CgGames,
    },
  ];
  const settings = {
    speed: 200,
    infinite: false,
    slidesToScroll: 3,
  };

  return (
    <>
      <Head>
        <title>GadgetRambo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Flex p={{ base: 2, sm: 10 }} w={"100%"}>
          {/* left side bar  */}
          <Show above={"md"}>
            <Flex flex={1} mx={4}>
              <LeftSidebar />
            </Flex>
          </Show>
          {/* middle contents starts  */}
          <Flex flex={4} direction={"column"} mx={4} w={"60%"}>
            {/* indepth section starts here  */}
            <Flex direction={"column"}>
              <Text fontSize={"xl"}>IN-DEPTH</Text>
              <SimpleGrid
                columns={{ base: 3, sm: 3, md: 4, lg: 5 }}
                spacing={5}
              >
                {news?.map((el: any, index: number) => {
                  if (index >= 5 && index < newsProducts + 5) {
                    return (
                      <Link key={el.id} href={`blogs/${el.id}`}>
                        <NewsCard
                          cardWidth="100%"
                          title={el.title}
                          titleSize={"15px"}
                          banner={el.banner}
                          imgWidth={{
                            base: "100px",
                            sm: "130",
                            md: "160px",
                            lg: "190px",
                          }}
                          imgHeight={{
                            base: "45px",
                            sm: "70px",
                            md: "100px",
                            lg: "120px",
                          }}
                        />
                      </Link>
                    );
                  }
                })}
              </SimpleGrid>
            </Flex>
            {/* product finder section start here  */}
            <Flex direction={"column"}>
              <Flex direction={"column"} p={2} bgColor={"#eae8e8"}>
                {/* product slider section */}
                <Text fontSize={"md"} ml={4}>
                  Categories Available
                </Text>
                <Slider slidesToShow={sliderItems} {...settings}>
                  {productFinderArr.map((item, id) => (
                    <Flex
                      alignItems={"flex-start"}
                      key={id}
                      borderRight={"1px solid #eae8e8"}
                      cursor={"pointer"}
                      background={"var(--color-bg-light)"}
                    >
                      <item.icon
                        style={{ fontSize: "30px", margin: "1rem auto" }}
                      />
                      <Text
                        color={"var(--color-light)"}
                        fontSize={"11px"}
                        whiteSpace={"nowrap"}
                        textAlign={"center"}
                      >
                        {item.name}
                      </Text>
                    </Flex>
                  ))}
                </Slider>
                {/* popular phones section  */}
                <Text fontSize={"md"} ml={4}>
                  Popular Phones
                </Text>
                <Flex
                  justifyContent={"space-evenly"}
                  bgColor={"white"}
                  m={2}
                  borderRadius={10}
                  boxShadow={"lg"}
                >
                  {mobiles?.map((mobile: any, id: number) => {
                    if (id >= gridProducts) {
                      return;
                    }
                    return (
                      <Link
                        key={mobile.id}
                        href={`products/mobiles/${mobile.id}`}
                      >
                        <NewsCard
                          title={mobile.modal}
                          banner={mobile.imgsrc}
                          titleSize={"13px"}
                          cardWidth={"100%"}
                          imgHeight={{
                            base: "45px",
                            sm: "70px",
                            md: "100px",
                            lg: "120px",
                          }}
                          titleAlign={true}
                        />
                      </Link>
                    );
                  })}
                </Flex>
                {/* latest phones section  */}
                <Text fontSize={"md"} ml={4}>
                  Latest Phones
                </Text>
                <Flex
                  justifyContent={"space-evenly"}
                  bgColor={"white"}
                  m={2}
                  borderRadius={10}
                  boxShadow={"lg"}
                >
                  {mobiles?.map((mobile: any, id: number) => {
                    if (id > 15 && id < 22) {
                      return (
                        <Link
                          key={mobile.id}
                          href={`products/mobiles/${mobile.id}`}
                        >
                          <NewsCard
                            title={mobile.modal}
                            banner={mobile.imgsrc}
                            titleSize={"13px"}
                            cardWidth={"100%"}
                            imgHeight={{
                              base: "45px",
                              sm: "70px",
                              md: "100px",
                              lg: "120px",
                            }}
                            titleAlign={true}
                          />
                        </Link>
                      );
                    }
                  })}
                </Flex>
                {/* upcoming phones section  */}
                <Text fontSize={"md"} ml={4}>
                  Upcoming Phones
                </Text>
                <Flex
                  justifyContent={"space-evenly"}
                  bgColor={"white"}
                  m={2}
                  borderRadius={10}
                  boxShadow={"lg"}
                >
                  {mobiles?.map((mobile: any, id: number) => {
                    if (id > 22 && id < 29) {
                      return (
                        <Link
                          key={mobile.id}
                          href={`products/mobiles/${mobile.id}`}
                        >
                          <NewsCard
                            title={mobile.modal}
                            banner={mobile.imgsrc}
                            titleSize={"13px"}
                            cardWidth={"100%"}
                            imgHeight={{
                              base: "45px",
                              sm: "70px",
                              md: "100px",
                              lg: "120px",
                            }}
                            titleAlign={true}
                          />
                        </Link>
                      );
                    }
                  })}
                </Flex>
              </Flex>
            </Flex>
            <SimpleGrid columns={3} spacing={4}>
              {news?.map((el: any, i: number) => {
                if (i > newsProducts) {
                  return (
                    <Link key={el.id} href={`blogs/${el.id}`}>
                      <NewsCard
                        title={el.title}
                        titleSize={"15px"}
                        banner={el.banner}
                        imgWidth={{
                          base: "120px",
                          sm: "190px",
                          md: "190px",
                          lg: "250px",
                        }}
                        imgHeight={{
                          base: "70px",
                          sm: "120px",
                          md: "120px",
                          lg: "180px",
                        }}
                      />
                    </Link>
                  );
                }
              })}
            </SimpleGrid>
          </Flex>
          {/* right side bar  */}
          <Show above={"lg"}>
            <Flex mx={4} flex={2}>
              <RightSidebar />
            </Flex>
          </Show>
        </Flex>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const mobiles = await getMobileAPI();
  const news = await getNewsAPI(15);
  const laptops = await getLaptopAPI();
  const tv = await getTvAPI();
  return {
    props: {
      mobiles,
      news,
      laptops,
      tv,
    },
  };
};
