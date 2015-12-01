class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    # @idea = Idea.new(idea_params)
    # if @idea.save
    #   respond_with @idea, status: :created, location: root_path
    # end
    respond_with :api, :v1, Idea.create(idea_params)
  end

  def update
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end
