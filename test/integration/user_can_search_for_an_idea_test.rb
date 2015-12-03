require "test_helper"

class UserCanSearchForAnIdeaTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user can search by title" do
    visit "/"
    find("#filter").click
    fill_in("filter", with: "testing")
    assert page.has_content?("For All The Green Dots")
    refute page.has_content?("Pizza and Cookies")
  end

  test "user can search by body" do
    visit "/"
    find("#filter").click
    fill_in("filter", with: "For All The Green Dots")
    assert page.has_content?("Testing")
    refute page.has_content?("Dinner")
  end
end
