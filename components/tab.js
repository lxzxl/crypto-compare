import { arrayOf, func, string } from 'prop-types';

class Tab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.tabs[0]
    };
  }
  render() {
    const { tabs } = this.props;
    const { activeTab } = this.state;
    return (
      <div className="tabs">
        <ul>
          {tabs.map(tab => (
            <li key={tab} className={tab === activeTab ? 'is-active' : ''} onClick={e => this.onClick(tab)}>
              <a>{tab}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  onClick = tab => {
    this.setState(({ activeTab }) => {
      if (activeTab !== tab) {
        this.props.onChange(tab);
        return { activeTab: tab };
      }
    });
  };
}

Tab.propType = {
  tabs: arrayOf(string),
  onChange: func
};

export default Tab;
