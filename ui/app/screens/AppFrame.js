import * as React from 'react';
import { View, Text } from 'react-native';
import { addNavigationHelpers } from 'react-navigation/lib/react-navigation.web.js';
import Link from '../components/Link.web.js';
import Footer from '../components/Footer.web.js';

const NavigationLinks = ({ navigation, className }) => {
  let links = [
    ...navigation.state.routes.map((route, i) => {
      if (route.routeName === 'Home' || route.routeName === 'NotFound') {
        return null;
      }
      return (
        <Link to={route.routeName} key={route.routeName}>
          {route.routeName}
        </Link>
      );
    }),
    <Text>
      Demo
    </Text>,
    <Text>
      GitHub
    </Text>,
  ];
  return <View>{links}</View>;
};

class AppFrame extends React.Component {
  state = { isMobileMenuOpen: false };

  componentWillReceiveProps(props) {
    if (this.props.navigation.state !== props.navigation.state) {
      this.setState({ isMobileMenuOpen: false });
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { navigation, router } = this.props;
    const { isMobileMenuOpen } = this.state;
    const childNavigation = addNavigationHelpers({
      ...navigation,
      state: navigation.state.routes[navigation.state.index],
    });
    const { state } = navigation;
    const ScreenView = router.getComponentForRouteName(
      state.routes[state.index].routeName,
    );
    const { routes, index } = state;
    const route = routes[index];
    const hasChildNavigation = !!route.routes;
    return (
      <View>
        <View>
          <View>
            <Link to='Home'>
              <Text>React Navigation</Text>
            </Link>

            <NavigationLinks navigation={navigation} />
            {hasChildNavigation && (
              <View onClick={() => {
                this.setState(s => ({
                  isMobileMenuOpen: !s.isMobileMenuOpen,
                }));
                window.scrollTo(0, 0);
              }}
              />
            )}
          </View>
        </View>
        <NavigationLinks navigation={navigation} reverse/>
        <ScreenView navigation={childNavigation} />
        <Footer />
      </View>
    );
  }
}
