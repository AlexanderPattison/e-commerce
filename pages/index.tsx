import { Authenticated } from "@pankod/refine-core";
import { Layout, Header, Sider, Footer } from "@pankod/refine-antd";

const AdminPage = () => {
  return (
    <Authenticated>
      <Layout>
        <Header>Admin Panel</Header>
        <Layout>
          <Sider>Sider Content</Sider>
          <Layout.Content>Main Content</Layout.Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </Authenticated>
  );
};

export default AdminPage;
