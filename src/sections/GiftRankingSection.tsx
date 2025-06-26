import { useState } from "react";
import styled from "@emotion/styled";
import { giftRankingData } from "@/mocks/giftRankingData";
import ProductCard from "@/components/ProductCard";

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing5};
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.title.title2Bold};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacing.spacing3};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const FilterButton = styled.button<{ active?: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme, active }) =>
        active ? theme.color.blue.blue700 : theme.color.semantic.textSub};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  white-space: nowrap;
`;

const Icon = styled.div<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${({ theme, active }) =>
        active ? theme.color.blue.blue700 : theme.color.blue.blue100};
  color: ${({ active }) => (active ? "#fff" : "#555")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 4px;
`;

const TabWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.semantic.backgroundDefault};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.spacing3};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.spacing4};
`;

const TabButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  color: ${({ theme, active }) =>
        active ? theme.color.blue.blue700 : theme.color.semantic.textSub};
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing4};

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LoadMore = styled.button`
  margin: ${({ theme }) => theme.spacing.spacing5} auto 0;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
  display: block;
`;

export default function GiftRankingSection() {
    const [selectedFilter, setSelectedFilter] = useState("전체");
    const [selectedTab, setSelectedTab] = useState("받고 싶어한");
    const [showAll, setShowAll] = useState(false);

    const filters = [
        { label: "전체", icon: "ALL" },
        { label: "여성이", icon: "👩🏻" },
        { label: "남성이", icon: "👨🏻" },
        { label: "청소년이", icon: "👦🏻" },
    ];

    const tabs = ["받고 싶어한", "많이 선물한", "위시로 받은"];

    const repeatedData = [...giftRankingData, ...giftRankingData, ...giftRankingData, ...giftRankingData, ...giftRankingData, ...giftRankingData, ...giftRankingData, ...giftRankingData, ...giftRankingData, ...giftRankingData, ...giftRankingData, ...giftRankingData].slice(0, 12);
    const visibleData = showAll ? repeatedData : repeatedData.slice(0, 6);

    return (
        <Wrapper>
            <Title>실시간 급상승 선물랭킹</Title>

            <FilterRow>
                {filters.map(({ label, icon }) => (
                    <FilterButton
                        key={label}
                        active={selectedFilter === label}
                        onClick={() => setSelectedFilter(label)}
                    >
                        <Icon active={selectedFilter === label}>{icon}</Icon>
                        {label}
                    </FilterButton>
                ))}
            </FilterRow>

            <TabWrapper>
                {tabs.map((tab) => (
                    <TabButton
                        key={tab}
                        active={selectedTab === tab}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </TabButton>
                ))}
            </TabWrapper>

            <Grid>
                {visibleData.map((item, index) => (
                    <ProductCard
                        key={`${item.id}-${index}`}
                        item={item}
                        rank={index + 1}
                    />
                ))}
            </Grid>

            <LoadMore onClick={() => setShowAll(!showAll)}>
                {showAll ? "접기" : "더보기"}
            </LoadMore>
        </Wrapper>
    );
}
