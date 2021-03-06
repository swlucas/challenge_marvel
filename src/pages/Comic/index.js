import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import api from '../../services/api';

import ComicDatail from '../../components/ComicDetail';

export default class Comic extends Component {
  state = {
    comic: '',
    loading: false,
  };

  async componentDidMount() {
    this.handleLoadComics();
  }

  handleLoadComics = async () => {
    this.setState({
      loading: true,
    });

    const PUBLIC_KEY = 'cacbd73e61134d2e2e15577ecb1599f7';
    const PRIVATE_KEY = '4928a5e4354deee8c7704a3a4758e2fba4e9642a';
    const timestamp = Number(new Date());
    const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);

    const { match } = this.props;
    const { id } = match.params;
    try {
      const response = await api.get(
        `comics/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`,
      );
      this.setState({
        comic: response.data.data.results[0],
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { comic } = this.state;
    return <ComicDatail comic={comic} />;
  }
}
