require "test_helper"

class IdeaTest < ActiveSupport::TestCase
  attr_reader :idea

  def setup
    @idea = Idea.find_or_create_by(title: "test", body: "testing time")
  end

  test "an idea exists" do
    assert_equal "test", idea.title
  end

  test "an idea has a default quality of swill" do
    assert_equal "swill", idea.quality
  end

  test "an idea has a body" do
    assert_equal "testing time", idea.body
  end

  test "a quality of 1 is plausible" do
    idea = Idea.create(title: "tester", body: "tested", quality: 1)

    assert_equal "plausible", idea.quality
  end

  test "a quality of 2 is genius" do
    idea = Idea.create(title: "tester", body: "tested", quality: 2)

    assert_equal "genius", idea.quality
  end
end
