require "test_helper"

class UserCanDeleteAnIdeaTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user can delete an idea" do
      visit "/"
      first("#delete-idea").click
      refute page.has_content?("Dinner")
  end
end
