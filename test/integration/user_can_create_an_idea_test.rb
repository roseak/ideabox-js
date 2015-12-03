require "test_helper"

class UserCanCreateAnIdeaTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user can create an idea" do
    visit "/"
    fill_in("idea-title", with: "Pizza Type")
    fill_in("idea-body", with: "vegan!")
    click_on("Create Idea")
    assert page.has_content?("Pizza Type")
    assert page.has_content?("vegan!")
  end
end
