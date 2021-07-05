import React from "react";
import { uniqueId } from "lodash";
import EditableForm from "./form/EditableForm";
import styled from "styled-components";

const SectionsList = ({ config, selected }) => {
  return (
    <Wrapper>
      {Object.entries(config).map(([key, value]) => {
        return (
          <CardWrapper key={uniqueId()}>
            <EditableForm
              title={key}
              data={value}
              type={selected}
              path={`${selected}.${key}`}
            />
          </CardWrapper>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 3px 11px 0px #e8eafc, 0 3px 3px -2px #b2b2b21a,
    0 1px 8px 0 #9a9a9a1a;
`;

export default SectionsList;
