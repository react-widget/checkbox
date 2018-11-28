import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import InnerCheckbox from './InnerCheckbox';

export default class Checkbox extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        prefixCls: PropTypes.string
    };

    static defaultProps = {
        prefixCls: 'nex-checkbox',
        className: '',
        style: {}
    };

    static contextTypes = {
        checkboxGroup: PropTypes.any,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState) ||
            !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
    }

    render() {
        const { props, context } = this;
        const {
            prefixCls,
            className,
            children,
            style,
            onMouseEnter,
            onMouseLeave,
            ...others
        } = this.props;

        const { checkboxGroup } = context;
        if (checkboxGroup) {
            others.onChange = () => checkboxGroup.toggleOption({ label: children, value: props.value });
            others.checked = checkboxGroup.value.indexOf(props.value) !== -1;
            others.disabled = 'disabled' in props ? props.disabled : checkboxGroup.disabled;
        }

        const classString = classNames({
            [`${prefixCls}-wrapper`]: true,
            [className]: !!className
        });

        return (
            <label
                className={classString}
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <InnerCheckbox
                    {...others}
                    prefixCls={prefixCls}
                />
                {children !== undefined ? <span className={`${prefixCls}-label`}>{children}</span> : null}
            </label>
        );
    }
}