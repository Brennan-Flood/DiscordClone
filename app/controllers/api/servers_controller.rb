class Api::ServersController < ApplicationController

  def create
  
    @server = Server.new(server_params)
      if @server.save
        @channel = Channel.new(name: 'general', server_id: @server.id, admin_id: @server.admin_id)
        @channel.save
        render :show
      else
        render json: @server.errors.full_messages, status: 422
      end
    
  end

  def show
    @server = Server.find(params[:id])
    @channels = @server.channels
    render :show
  end

  def index
    @servers = Server.all
    render :index
  end

  def destroy
    @server = Server.find(params[:id])
      if @server.destroy
        render :show
      else
        render json: @server.errors.full_messages, status: 401
      end
  end

  def update
    @server = Server.find(params[:id])
      if @server.update!(server_params)
        render :show
      else
        render json: @server.errors.full_messages, status: 422
      end
  end

  private
  def server_params
    params.require(:server).permit(:name, :admin_id)
  end
end