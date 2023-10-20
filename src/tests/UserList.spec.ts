import UsersListVue from "@/pages/AdminPanelPage/UsersList.vue";
import { usersStore } from "@/store/usersStore";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

setActivePinia(createPinia());

jest.mock("@/services/userServices/userServices", () => {
  return {
    getAll: jest.fn(),
  };
});

jest.mock("firebase/app", () => {
  return {
    auth: jest.fn(),
  };
});

const wrapper = shallowMount(UsersListVue, {
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          usersStore: {
            userList: [],
          },
        },
      }),
    ],
  },
});

const users = usersStore();
users.$patch({
  userList: [
    {
      email: "user1@example.com",
      id: "1",
      username: "user1",
    },
    {
      email: "user2@example.com",
      id: "2",
      username: "user2",
    },
    {
      email: "user3@example.com",
      id: "3",
      username: "user3",
    },
  ],
});

describe("Admin list", () => {
  it("should display the column labels", () => {
    const columnLabels = wrapper.findAll("th");
    expect(columnLabels.length).toBe(3);

    const expectedLabels = ["Username", "Email", "ID"];

    columnLabels.forEach((label, index) => {
      expect(label.text()).toBe(expectedLabels[index]);
    });
  });
  it("should display user list", async () => {
    await wrapper.vm.$nextTick();

    const rows = wrapper.findAll("tr");

    expect(rows.length).toBe(users.userList.length + 1);

    users.userList.forEach((user, index) => {
      const cells = rows[index + 1].findAll("td");
      expect(cells.length).toBe(3);
      expect(cells[0].text()).toBe(user.username);
      expect(cells[1].text()).toBe(user.email);
      expect(cells[2].text()).toBe(user.id);
    });
  });
});
