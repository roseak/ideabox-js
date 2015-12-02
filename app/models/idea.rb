class Idea < ActiveRecord::Base
  default_scope { order('created_at') }
  validates :title, presence: true
  validates :body, presence: true, uniqueness: true
  enum quality: %w(swill plausible genius)
end
