import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import isEmpty from 'lodash.isempty';
import Text from '../text/Text';
import Icon from '../icons/Icon';

export const DummyNavButton = () => (
  <View style={styles.dummyNavBtn} />
);

export const Title = (props) => {
  const {
    text,
  ...attributes,
  } = props;

  return (
    <Text
      numberOfLines={1}
      {...attributes}
    >
      {text}
    </Text>
  );
};

export const NavButton = (props) => {
  const {
    icon,
  ...attributes,
  } = props;

  return (
    <Icon
      name={icon}
      {...attributes}
    />
  );
};

function generateChild(value, type) {
  if (React.isValidElement(value)) {
    return (
      <View key={type}>
        {value}
      </View>
    );
  } else if (typeof value === 'object' && !isEmpty(value)) {
    return type === 'center' ?
      <Title {...value} key={type} /> :
      <NavButton {...value} key={type} />;
  }
  return type === 'center' ? null : <DummyNavButton key={type} />;
}

function populateChildren(propChildren) {
  const childrenArray = [];

  const leftComponent = generateChild(propChildren.leftComponent, 'left');
  const centerComponent = generateChild(propChildren.centerComponent, 'center');
  const rightComponent = generateChild(propChildren.rightComponent, 'right');

  childrenArray.push(
    leftComponent,
    centerComponent,
    rightComponent,
  );

  return childrenArray;
}

const Header = (props) => {
  const {
    children,
    statusBarProps,
    leftComponent,
    centerComponent,
    rightComponent,
    backgroundColor,
    outerContainerStyles,
    innerContainerStyles,
    ...attributes,
  } = props;

  let propChildren = [];

  if (leftComponent || centerComponent || rightComponent) {
    propChildren = populateChildren({
      leftComponent,
      centerComponent,
      rightComponent,
    });
  }

  return (
    <View style={[styles.outerContainer, { backgroundColor }, outerContainerStyles]} {...attributes}>
      <StatusBar {...statusBarProps} />
      <View style={[styles.innerContainer, innerContainerStyles]}>
        {propChildren.length > 0 ? propChildren : children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dummyNavBtn: {
    height: 24,
    width: 24,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  outerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    padding: 15,
    height: 70,
  },
});

export default Header;
