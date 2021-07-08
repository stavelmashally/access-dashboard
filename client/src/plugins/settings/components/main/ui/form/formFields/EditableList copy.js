import React, { Component } from 'react';
import Editable from './Editable';
import { HighlightOffOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Input } from 'plugins/settings/components/shared/Layout';
import styled from 'styled-components';

const EditableList = ({ label, value, onValueChanged, ...props }) => {
  
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  gap: 0.5rem;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  padding: 0;
  margin: 0;
`;

export default EditableList;
