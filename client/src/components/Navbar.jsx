import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const MyNavbar = (props) => {
  const { loggedIn, logoutHandler, user } = useContext(AuthContext);
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem('dark_theme')) || false
  );
  const [display, changeDisplay] = useState('none');
  const { colorMode, toggleColorMode } = useColorMode();
  const navColor = useColorModeValue('gray.800', 'gray.500');
  const color = useColorModeValue('white', 'gray.800');
  const menuColor = useColorModeValue('gray.500', 'gray.800');
  console.log(color);
  const handleChange = () => {
    setChecked(!checked);
    localStorage.setItem('dark_theme', JSON.stringify(!checked));
    toggleColorMode();
  };

  const MenuItems = (props) => (
    <Link
      as={RouterLink}
      mt={{ base: 4, md: 0 }}
      mr={6}
      display="block"
      to={props.to}
      style={{ color: '#FFF', textDecoration: 'none' }}
      boxShadow="none !important"
    >
      {props.children}
    </Link>
  );

  return (
    <Flex top="1rem" right="1rem" overflowX="hidden">
      <Flex align="center" width="100vw" bgColor={navColor}>
        <Flex
          display={['none', 'none', 'flex', 'flex']}
          w="100vw"
          mt={0}
          position="relative"
          align="center"
          justify="space-between"
          padding="0.8rem"
          boxShadow="2xl"
          bg={navColor}
          color="white"
        >
          <Flex align="center" ml={5} mr={0}>
            <Heading as="h1" size="lg" letterSpacing="-.1rem">
              <MenuItems to="/">SMS</MenuItems>
            </Heading>
          </Flex>

          {/* <Switch flex="1" ml="2px" pl="1px" onChange={handleChange} isChecked={checked} /> */}

          {user && (
            <Button
              boxShadow="none !important"
              colorScheme="white"
              ml="auto"
              mr="0"
            >
              <Text fontSize="17px" color="white">
                {user.username}
              </Text>
            </Button>
          )}
          {!loggedIn && (
            <Button
              as={RouterLink}
              to="/signin"
              bg="transparent"
              border="1px"
              mr={5}
            >
              Log In
            </Button>
          )}
          {loggedIn && (
            <Button onClick={logoutHandler} bg={navColor} border="1px" mr={5}>
              Log Out
            </Button>
          )}
        </Flex>
        {display === 'none' && (
          <IconButton
            aria-label="Open Menu"
            size="lg"
            m={2}
            p={5}
            icon={<HamburgerIcon />}
            color={menuColor}
            bgColor={navColor}
            onClick={() => changeDisplay('flex')}
            display={['flex', 'flex', 'none', 'none']}
            zIndex={2}
          />
        )}
        {display === 'none' && (
          <Flex
            align="center"
            mb={4}
            display={['flex', 'flex', 'none', 'none']}
          >
            <Heading as="h1" size="lg" letterSpacing="-.1rem">
              <MenuItems to="/">SMS</MenuItems>
            </Heading>
          </Flex>
        )}
      </Flex>
      <Flex bgColor={navColor}>
        {display === 'none' && user && (
          <Flex align="center">
            <Button boxShadow="none !important" colorScheme="white">
              <Text fontSize="17px" color="white">
                {user.username}
              </Text>
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex
        w="100vw"
        display={display}
        bgColor={navColor}
        color="white"
        zIndex={20}
        pos="relative"
        top="0"
        left="0"
        overflow="none"
        direction="column"
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            bgColor={navColor}
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay('none')}
          />
        </Flex>

        <Flex direction="column" align="center" width="100vw" pb="4">
          {!loggedIn && (
            <Flex>
              <Button
                onClick={() => changeDisplay('none')}
                mb={3}
                as={RouterLink}
                to="/signin"
                bg="transparent"
                border="1px"
              >
                Log In
              </Button>
            </Flex>
          )}
          {loggedIn && (
            <Flex>
              <Button
                mb={3}
                onClick={() => {
                  changeDisplay('none');
                  logoutHandler();
                }}
                bg={navColor}
                border="1px"
              >
                Log Out
              </Button>
            </Flex>
          )}
          <Flex>
            {/* <Button > */}
            {/* <Switch  onChange={()=>{changeDisplay('none');handleChange()}} isChecked={checked} /> */}
            {/* </Button> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MyNavbar;
