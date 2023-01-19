import { Layout } from "antd";
import { Row } from "antd/lib/grid";
import Menu from "antd/lib/menu";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useHistory } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RouteNames } from "../routes";

type MenuItemsType = {
  login: ItemType[];
  logout: ItemType[];
};

const NavBar = () => {
  const router = useHistory();
  const { isAuth, user } = useTypedSelector((state) => state.authReducer);

  const { logout } = useActions();

  const items: MenuItemsType = {
    login: [
      {
        label: "Log in",
        key: 1,
        onClick: () => router.push(RouteNames.LOGIN),
      },
    ],
    logout: [
      {
        label: "Log out",
        key: 1,
        onClick: logout,
      },
    ],
  };

  return (
    <Layout.Header>
      <Row justify="end">
        <>
          <div style={{ color: "white" }}>{user.username}</div>
          <Menu
            theme="dark"
            mode={"horizontal"}
            selectable={false}
            items={isAuth ? items.logout : items.login}
          />
        </>
      </Row>
    </Layout.Header>
  );
};

export default NavBar;
