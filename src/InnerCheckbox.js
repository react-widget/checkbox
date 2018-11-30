import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function noop() { }

export default class Checkbox extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        name: PropTypes.string,
        type: PropTypes.string,
        defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        disabled: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        tabIndex: PropTypes.string,
        readOnly: PropTypes.bool,
        indeterminate: PropTypes.bool,
    };
    static defaultProps = {
        prefixCls: 'rw-checkbox',
        className: '',
        style: {},
        type: 'checkbox',
        defaultChecked: false,
        onFocus: noop,
        onBlur: noop,
        onChange: noop,
        // onFocus() { },
        // onBlur() { },
        // onChange() { },
    };

    static getDerivedStateFromProps(props, state) {
        const newState = {};

        if ('checked' in props) {
            newState.checked = props.checked;
        }

        return newState;
    }

    state = {
        checked: 'checked' in this.props ? this.props.checked : this.props.defaultChecked
    }

    handleChange = (e) => {
        const { props } = this;
        if (props.disabled) {
            return;
        }
        if (!('checked' in props)) {
            this.setState({
                checked: e.target.checked,
            });
        }
        props.onChange({
            target: {
                ...props,
                checked: e.target.checked,
            },
            stopPropagation() {
                e.stopPropagation();
            },
            preventDefault() {
                e.preventDefault();
            },
        });
    };

    render() {
        const {
            prefixCls,
            className,
            style,
            name,
            type,
            disabled,
            readOnly,
            tabIndex,
            onClick,
            onFocus,
            onBlur,
            indeterminate,
            ...others
        } = this.props;

        const { checked } = this.state;

        const globalProps = Object.keys(others).reduce((prev, key) => {
            if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
                prev[key] = others[key];
            }
            return prev;
        }, {});

        const classString = classNames(prefixCls, className, {
            [`${prefixCls}-checked`]: checked,
            [`${prefixCls}-indeterminate`]: indeterminate,
            [`${prefixCls}-disabled`]: disabled,
        });

        return (
            <span className={classString} style={style}>
                <input
                    name={name}
                    type={type}
                    readOnly={readOnly}
                    disabled={disabled}
                    tabIndex={tabIndex}
                    className={`${prefixCls}-input`}
                    checked={!!checked}
                    onClick={onClick}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={this.handleChange}
                    {...globalProps}
                />
                <span className={`${prefixCls}-inner`} />
            </span>
        );
    }
}