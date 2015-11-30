require "test_helper"

class UserCanViewRootPageTest < ActionDispatch::IntegrationTest
  def setup
    Capybara.app = IdeaboxJs::Application
  end

  test "user can view root page" do
    visit root_path

    assert page.has_content?("Idea Box")
  end
end
