require "test_helper"

class UserCanDeleteAnIdeaTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user can delete an idea" do
      visit "/"
      fill_in("idea-title", with: "Delete me!")
      fill_in("idea-body", with: "now.")
      click_on("Create Idea")
      first("#delete-idea").click
      refute page.has_content?("Delete me!")
  end
end
