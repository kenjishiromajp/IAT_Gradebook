import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import 'antd/dist/antd.css';
import './style.css';
import DemoLoadingCard from './DemoLoadingCard';

const text = `
## Source code

~~~js
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
        <Button onClick={this.onClick}>{ loading ? 'Parar o Carregamento' : 'Voltar a carregar'}</Button>
      </div>
    );
  }
}

export default DemoLoadingCard;
~~~

### Props Component

| Propriedade       | Descrição                                                            | Tipo     | Valor Padrão       |
| ----------------- | -------------------------------------------------------------------- | -------- | ------------------ | 
| loading           | Propriedade para decidir se mostra um loading e não monta o children | boolean  |          -         |

`;

storiesOf('LoadingCard', module).add(
  'Default usage',
  withInfo({ source: false, text })(() => <DemoLoadingCard />)
);
