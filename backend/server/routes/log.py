from flask import Blueprint, jsonify, request
from math import ceil
import traceback

from server.utils import (
    serialize_sqlalchemy_objs,
)
from server.routes.auth import admin_required
from server.models.Log import Log

bp = Blueprint("logs", __name__, url_prefix="/logs")


@bp.route("/")
@admin_required()
def filtered_repositories():
    # Extracting values from query string
    limit = request.args.get("limit", default=25, type=int)
    if limit != None and limit <= 0:
        limit = 25
    page = request.args.get("page", default=1, type=int)
    if page != None and page < 1:
        page = 1

    try:
        # Create query & get results
        query = Log.query.order_by(Log.created_at.desc())
        numEntries = query.count()
        results = query.offset((page - 1) * limit).limit(limit).all()

        response = {
            "message": "Found results.",
            "currPage": page if numEntries != 0 else 0,
            "numPages": ceil(numEntries / limit),
            "logs": serialize_sqlalchemy_objs(results),
        }
        return jsonify(response), 200
    except:
        print(traceback.format_exc())
        response = {"message": "Something went wrong with finding logs in our databse."}
        return jsonify(response), 500
