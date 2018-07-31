import React, { Component } from 'react';
import { Button } from 'antd';
import LoadingCard from '../';

class DemoLoadingCard extends Component {
  static propTypes = LoadingCard.propTypes;
  state = {
    loading: true,
  };
  onClick = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <div>
        <LoadingCard loading={loading}>
          <div>Meu Elemento</div>
        </LoadingCard>
        <Button onClick={this.onClick}>
          {loading ? 'Parar o Carregamento' : 'Voltar a carregar'}
        </Button>
      </div>
    );
  }
}

export default DemoLoadingCard;
