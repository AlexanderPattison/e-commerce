import { Authenticated } from "@refinedev/core";
import { Layout, Header, Sider, Footer } from "@refinedev/antd";

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
