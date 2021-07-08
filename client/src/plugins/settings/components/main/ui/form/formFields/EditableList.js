import React, { Component } from 'react';
import Editable from './Editable';
import { HighlightOffOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Input } from 'plugins/settings/components/shared/Layout';
import styled from 'styled-components';

class EditableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.value,
      newInput: '',
    };
  }

  handleListItemChange = (event, index) => {
    const newList = [...this.state.list];
    newList[index] = event.target.value;
    this.setState(
      {
        list: newList,
      },
      () => {
        this.props.onValueChanged({
          label: this.props.label,
          value: this.state.list,
        });
      }
    );
  };

  deleteItem = index => {
    const newList = [...this.state.list];
    newList.splice(index, 1);
    this.setState(
      {
        list: newList,
      },
      () => {
        this.props.onValueChanged({
          label: this.props.label,
          value: this.state.list,
        });
      }
    );
  };

  handleDeleteButtonClick = index => {
    return event => {
      // In order for the form not to be submitted
      event.preventDefault();
      this.deleteItem(index);
    };
  };

  getList = () => {
    return this.state.list.map((elem, index) => {
      return (
        <ListItem key={index}>
          <Input
            variant="small"
            type="text"
            value={elem}
            placeholder="Enter a value"
            onChange={e => {
              this.handleListItemChange(e, index);
            }}
          />
          <IconButton
            size="small"
            onClick={this.handleDeleteButtonClick(index)}
          >
            <HighlightOffOutlined />
          </IconButton>
        </ListItem>
      );
    });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onKeyUp = event => {
    if (event.key === 'Enter' && event.target.value.trim(' ').length > 0) {
      const newList = [...this.state.list];
      this.setState(
        {
          list: newList.concat(event.target.value),
          newInput: '',
        },
        () => {
          this.props.onValueChanged({
            label: this.props.label,
            value: this.state.list,
          });
        }
      );
    }
  };

  render() {
    return (
      <Editable {...this.props}>
        <List>
          {this.getList()}
          <Input
            variant="small"
            name="newInput"
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
            placeholder="New Item"
            value={this.state.newInput}
          />
        </List>
      </Editable>
    );
  }
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
`;

const ListItem = styled.li`
  padding-left: 0;
`;

export default EditableList;
