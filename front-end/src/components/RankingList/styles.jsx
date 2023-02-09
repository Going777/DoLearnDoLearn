import styled from "styled-components";

export const SRankingSection = styled.section`
  .ranking-icon {
    margin-right: 6px;
  }
  h1 {
    font-family: "GmarketSansBold";
    padding-bottom: calc(0.5vw + 1px);
    display: inline-block;
    margin-top: 0px;
  }
`;

export const SRankingItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2vw;
`;
