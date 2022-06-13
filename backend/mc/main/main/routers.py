class CustomRouter(object):

    def db_for_read(self, model, **hints):
        return getattr(model, "_DATABASE", "default")

    def db_for_write(self, model, **hints):
        return getattr(model, "_DATABASE", "default")

    def allow_relation(self, obj1, obj2, **hints):
        """
        Relations between objects are allowed if both objects are
        in the master/slave pool.
        """
        db_list = ('default', 'remotedata')
        return obj1._state.db in db_list and obj2._state.db in db_list

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        All non-auth models end up in this pool.
        """
        return True