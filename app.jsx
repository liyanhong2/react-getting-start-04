// 父组件
var MyContainer = React.createClass({
    getInitialState: function () {
        return {
            totalCheckedCount: 0
        };
    },
    onChildChanged: function (newState) {
        var newToral = this.state.totalCheckedCount
            + (newState ? 1 : -1);
        this.setState({
            totalCheckedCount: newToral
        });
    },
    render: function () {
        var totalChecked = this.state.totalCheckedCount;
        return (
            <div>
                <div>How many are checked: {totalChecked}</div>
                <ToggleButton text="Toggle me"
                              initialChecked={this.state.checked}
                              callbackParent={this.onChildChanged}
                />
                <ToggleButton text="Toggle me too"
                              initialChecked={this.state.checked}
                              callbackParent={this.onChildChanged}
                />
                <ToggleButton text="And me"
                              initialChecked={this.state.checked}
                              callbackParent={this.onChildChanged}
                />
            </div>
        );
    }
});

// 子组件
var ToggleButton = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.initialChecked
        };
    },
    onBoxChecked: function () {
        var newState = !this.state.checked;
        this.setState({
            checked: newState
        });
        // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
        this.props.callbackParent(newState);
    },
    render: function () {
        // 从【父组件】获取的值
        var text = this.props.text;
        // 组件自身的状态数据
        var checked = this.state.checked;

        return (
            <label>{text}: <input type="checkbox" checked={checked} onChange={this.onBoxChecked}/></label>
        );
    }
});
ReactDOM.render(
    <MyContainer/>,
    document.getElementById('example')
);